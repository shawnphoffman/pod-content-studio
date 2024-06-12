import { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure'

import AuthorPreview from '@/components/studio/AuthorPreview'
import AwardPreview from '@/components/studio/AwardPreview'

export const podStructure: StructureResolver = S =>
	S.list()
		.title('Content')
		.items([
			//
			S.listItem()
				.title('Posts by Podcast')
				.child(
					S.documentTypeList('category')
						.title('Posts by Podcast')
						.child(categoryId =>
							S.documentList().title('Posts').filter('_type == "post" && $categoryId in categories[]._ref').params({ categoryId })
						)
				),
			//
			S.listItem()
				.title('Posts by Author')
				.child(
					S.documentTypeList('author')
						.title('Posts by Author')
						.child(authorId => S.documentList().title('Posts').filter('_type == "post" && $authorId == author._ref').params({ authorId }))
				),
			//
			S.divider(),
			//
			...S.documentTypeListItems().filter(listItem => !['siteSettings', 'media.tag'].includes(listItem.getId()!)),
			//
			S.divider(),
			//
			S.listItem()
				.title('Test')
				.child(
					S.documentTypeList('category')
						.title('Content by Podcast')
						.child(categoryId =>
							S.list()
								.title('Content by Podcast')
								.items([
									S.listItem()
										.title('Posts')
										.child(
											S.documentList().title('Posts').filter('_type == "post" && $categoryId in categories[]._ref').params({ categoryId })
										),
									S.listItem()
										.title('Awards')
										.child(
											S.documentList().title('Awards').filter('_type == "award" && category._ref == $categoryId').params({ categoryId })
										),
								])
						)
				),
		])

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
	const views: any[] = []

	if (schemaType === 'award') {
		views.push(S.view.component(AwardPreview).title('Preview'))
	}
	if (schemaType === 'author') {
		views.push(S.view.component(AuthorPreview).title('Preview'))
	}

	return S.document().views([S.view.form(), ...views])
}
