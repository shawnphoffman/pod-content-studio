import { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure'

import AuthorPreview from '@/components/studio/AuthorPreview'
import AwardPreview from '@/components/studio/AwardPreview'
import PodcastPreview from '@/components/studio/PodcastPreview'
import PostPreview from '@/components/studio/PostPreview'

// Per-podcast structure: shows only the content tied to one podcast's
// category id, plus the globally-shared types (authors).
export function buildPodStructure(podId: string): StructureResolver {
	return S =>
		S.list()
			.title('Content')
			.items([
				S.listItem()
					.title('Posts')
					.child(
						S.documentList()
							.title('Posts')
							.filter('_type == "post" && $podId in categories[]._ref')
							.params({ podId })
					),
				S.listItem()
					.title('Bonus episodes')
					.child(
						S.documentList()
							.title('Bonus episodes')
							.filter('_type == "bonusEpisode" && $podId in categories[]._ref')
							.params({ podId })
					),
				S.listItem()
					.title('Awards')
					.child(
						S.documentList()
							.title('Awards')
							.filter('_type == "award" && category._ref == $podId')
							.params({ podId })
					),
				S.listItem()
					.title('Banners')
					.child(
						S.documentList()
							.title('Banners')
							.filter('_type == "siteBanner" && $podId in podcasts[]._ref')
							.params({ podId })
					),
				S.divider(),
				S.listItem()
					.title('Podcast settings')
					.child(S.document().documentId(podId).schemaType('category')),
				S.divider(),
				// Authors are shared across podcasts, so show the global list.
				S.documentTypeListItem('author').title('Authors'),
			])
}

// Admin (cross-podcast) structure: the original layout that lists every
// podcast's content grouped by category. Kept for the "All Podcasts"
// workspace that handles content shared across the network.
export const adminStructure: StructureResolver = S =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Posts by Podcast')
				.child(
					S.documentTypeList('category')
						.title('Posts by Podcast')
						.child(categoryId =>
							S.documentList().title('Posts').filter('_type == "post" && $categoryId in categories[]._ref').params({ categoryId })
						)
				),
			S.listItem()
				.title('Posts by Author')
				.child(
					S.documentTypeList('author')
						.title('Posts by Author')
						.child(authorId => S.documentList().title('Posts').filter('_type == "post" && $authorId == author._ref').params({ authorId }))
				),
			S.listItem()
				.title('Banners by Podcast')
				.child(
					S.documentTypeList('category')
						.title('Banners by Podcast')
						.child(categoryId =>
							S.documentList()
								.title('Banners')
								.filter('_type == "siteBanner" && $categoryId in podcasts[]._ref')
								.params({ categoryId })
						)
				),
			S.divider(),
			...S.documentTypeListItems().filter(listItem => !['siteSettings', 'media.tag'].includes(listItem.getId()!)),
		])

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
	const views: any[] = []

	if (schemaType === 'award') {
		views.push(S.view.component(AwardPreview).title('Preview'))
	}
	if (schemaType === 'author') {
		views.push(S.view.component(AuthorPreview).title('Preview'))
	}
	if (schemaType === 'category') {
		views.push(S.view.component(PodcastPreview).title('Preview'))
	}
	if (schemaType === 'post') {
		views.push(S.view.component(PostPreview).title('Preview'))
	}

	return S.document().views([S.view.form(), ...views])
}
